�}t� r k  ���]4OC��a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��(>B	?���`��G�#�HL��x���O�\���A4�������H��pER ��G-
#�ǜ��j���i\p~%�e�Msv���j���3
;�f�8�E~A���f'��  ?.i�rWP���N���ip��"�m	�Z�Q��IV��]M� E��U%�Ƈb����~=���)��	�e�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIl-�K=8m��j�7�E�Gqf�����[�L�2�Rޔ�L)P�=����[ҝ��b
�����Sǘ�L%���&�P�-l�b�-��%�G��eϤ�]c������~�<q�Ƒ������+�.��f����G@�_,׸%��k�~�Q��)�O��A�@N�_t��Fh�B�b4�dE�(�
��76�.mEY�f��}��s]�����=h��eR����n�)(��{���w���;#l6�� �#��2@�K0�0����RO��-�Ι��f��EL+��X�D�� �g�JٻCEJ�&o�eO��J>?��7����#.9w�lU끀��`�)�i,h-$���i>��D=5��_�XYb!������0z���=�Z|iMĮ�$`S��W��T���u��\�:g���ǜ�=GlZcKW�H^g���!:��hh`�(�5�,0�5�i�ߋ�;Y�\����q��\�!�!�E���S5�ӅO�慾�>z���j-~ į���l(ʹ��^�6r�Ý�J�T�Wꦇ9�p2u�A�1s��5���JG!;�u�Sbe�3y��\�eN�ď����/h�/�������g�s5�O����j�/�4����ή���a<%O�}�A���@ )��UXV�^IY��X"�@,!A�5��8���4��貊��Y��s7���:Aj�7|zs�^����v]�4B����KuSSQ,��yMX�툡on����xtkU4Xf��F쪱�������<<ŗ8����j=ܼ:R;y�{C1�8Y@���wQ�i�G#��d`e�[�5��v7F�7�	u����Z��$����lU�|�=�D��9D��pW2N��v�phk��*T�ey��>�кy�Ywb��Թ�v���B�T��ڹH��AL��n��.mA��,�R`�T{��p�"�yW�f����?��U J���A���lE��rE5	�FI/Ύ�ao߯Ifc���s���Z�F�����T����@e="reader">the index reader for the Filter
		/// </param>
		/// <returns> the bitset
		/// </returns>
		public override System.Collections.BitArray Bits(IndexReader reader)
		{
			Filter cachedFilter = FilterManager.GetInstance().GetFilter(filter);
			return cachedFilter.Bits(reader);
		}
	}
}