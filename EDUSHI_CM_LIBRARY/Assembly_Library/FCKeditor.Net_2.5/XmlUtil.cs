�}�� r �
  �Q�s�����a	���+_���}��=78N���X���߂�!޶�d�+�F�϶
\3mq�(ǡ��R��Ű��K1C�zD�a`�X9bz�#O-�3��)�r%ׯ���Q��Ȝ"�"Qx!��Y턙x�a�)��O��}P�=�m�����]xK�6��5��{��a�6*2�,�_�]�c�}���i�����n%�m�,����J�6@U��._�T�;/l�tF2E�ƾã�fNO�W��CL:@FE����J���X_�q�b�@��-�}���x�Z����[&Z���w��d�w@�+��F�=�!<�v��p� Z��ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�1���������tA�m���^)�O`�N�\�,H���-���A��g��;!�|!M��� 3erj�s�7���Z@�&�-��l�r�}֎�<8�a&�V�ҹ�V�Lt]��XW��b����7�TM���#V��b!��v#���v���E�J9W�͊��"٩M�8��y�^��nR�׉)�ut����;�Ҍe&�Ƕ��%�{��V`�
̄�S�6�()ߚ6�hB֚����$�٥ ���=�&�k �HKh�H�@�s#0K5�����=G���m�f�;��or!4(kV�Y���Q�N�I������G�����/ �þ#�����lS�+B���-1ښ%r�y��:�*��X�g����� ��s��ZR�}w��i���#Wk�Rw����W�aP񻡓Y�>��]�D��S@BQa���}%Ξ#0�~��������L�D�5fE'���#|{�׍@�Q��%[��/��sURfoG�?Ƣ��JBl�&^�'��FX�����U��Y� � zGe��F��K5�ˉ���V��^Nj����)�2�M��h���_�Lw��Q�,�W��R��}�$��`?��T��	�ș��ߦ_(Ax�yW˾�nc�g�6a�^Q
xo������U��(bJ��[��-�~Dy9 �� ��!^^PC���{�\��s��8�{��",�/X�w����5���t��f;�b�  U�#)qM��T�:|�^���0�Y�~�s6/�XC���H�f�_��.��L������P�F���yq�bg�D�?JDT]砙
v
�(���=��a,q#zf|Q=@�,�jP����%ؿc�*��J��P��(��2Sx�BRr.8���QG��ڊ)�MBw9���U`7��Q������d8�/��u>l0:�	�|�X0���!x��JC�BDu͗`ԙ��o��W��??[�Ӏ�ez�=�R~|OU��+�Y��̱�$<�^7�J���t���_�oame, string value )
		{
			XmlAttribute oAtt = xmlDocument.CreateAttribute( name ) ;
			oAtt.Value = value ;
			return oAtt ;
		}

		public static void SetAttribute( XmlNode node, string attributeName, string attributeValue )
		{
			if ( node.Attributes[ attributeName ] != null )
				node.Attributes[ attributeName ].Value = attributeValue ;
			else
				node.Attributes.Append( CreateAttribute( node.OwnerDocument, attributeName, attributeValue ) ) ;
		}
	}
}
