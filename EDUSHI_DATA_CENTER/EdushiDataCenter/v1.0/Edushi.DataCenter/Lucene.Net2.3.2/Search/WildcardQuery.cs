�}k� r �  �6���`@��a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��(>B	?���`��G�#�HL��x���O�\���A4�������H��pER ��� MS
0�����l�tS��xR*�c�m	���n�̘~S>�h�j�\ApbK_۵�;T��!cRuq�5���N��pc���l�K�J��I��K
A�E��"���i�(ø�h"���>��F�"�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIlD+�[�=�Ds1_&��H�˽,A�GM�,$WwQ}c���S8eL����r�	ki��n�(����A4x�z7ZMJZ� ا�ku�vE�<j���ےj���)��T���?���qh�0�{pƏ�������O<��kPQK��W8�v8�wa�C�_ �:��X�a��V���3��K��6�!Z�z������Xw��e��ݲ���E��Ϫ���K��men����':�� _r�0� �9@Y�(ø�|�i��"y<�i�9:�V�wc��n�^oӖ��?.�aO0��\�?^L���N"X�,����f��ʐ)m�j�g�z�'���A�&O�m"���f�10�;CY=�&$�6@�d��4�k���a1��� ޘk��U%�^_ 
���>}��Z8�Z���򬃁(����Z`}$����� �h�t&���{:�J6or��ҹ���,Cٝ�������E�V�M��2e�Ӿ�Ԟn�zwȱ�u3X����@����A��;l�)��Z\�O.A��ZO}w[{h��mw�I}�4�M�`쩺�����P����E��l����J�-���d�R���4F1�IV>߷�Oܜ���1�F
0��≽m�q�c��:�2��8�[�Ul�Ϙ�M�B���F���nH�Ӧ�\�f�`b��Bc����?���\����C���lѬG΢Z�C��K�އ�7*g��3l���ߴ�.]-���]H(��4��0"��NHI�0��8Y�K[�9�21�m��%�/e8{�q}��sĿ�Ѓ�"�d���g�L@
[�*�Yw�C~�V6H?,��ݕ�K�v�8�6b+9��(����eI�uj��`��F< e�����VE�:���,���Hǝ�8ؠ���S�H>4�,��|�&�D'��H՝ �޺�ƭ:�8��t!�J�lz�"�E��đ��K*!� �K����%N~�f����i����p�O����b�#	O���v���o����2��%�@4�M|�v		}
		
		public override Query Rewrite(IndexReader reader)
		{
			if (this.termContainsWildcard)
			{
				return base.Rewrite(reader);
			}
			
			return new TermQuery(GetTerm());
		}
		
		public override int GetHashCode()
		{
			return base.GetHashCode();
		}
	}
}