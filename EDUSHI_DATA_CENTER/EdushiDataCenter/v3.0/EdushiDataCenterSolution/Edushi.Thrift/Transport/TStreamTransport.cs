�}�� r m  ��0i'��F��a	��7��_N��}���C� F����ǿ�9�P|��H��-4|$�	�!�tB����Pz.?U��g�("����"��dk�
;� �T��z���(��F>��^�BDx=?��)�nB��,xt�sWΫ��Wl�[r��} ���h׋]
V�(&i�'Ζ��]�A�p;��>\]�d�����[�Ǿ��3�Uφo�ާ	/bhoV���s��P�b�]�ӂ����}�`��D�qu��2ul���i�q��]uv�k�e�c�/�m^����JgY����̬�8p�;��"���Eէ����l�F�+�~�\�H��t�ʹp�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l02&k���-+j�<�Y�F��;���}�������-0��N�r(�?�TA#�J��M�|�M�r��6F�1�>l.���%EMƝ���ؙ{fg�|O��������6T�U2z3�������z1s׻z۱��S:Ԫv��m
I��Ў�v��lUx�;�r���}�CAޟ�h��M�e��=޳}]<#���ԩz�~���2�;.�Nq$����^�Ƭ���ވ�j$ g���a$h��ђ�X��}����7�q��/���QH�dϝ=���#@_̨ƍ:�l��'� ��{fl��!�;�J�y a��⓼.m��m��Av�n	�E��b~0,�����Y��g�|<�:ެsygl�f����Y��땛~8�Q5E�!�1Ss�R���p�#�M}陫ʹ�˗U�{�_�E)�`H����X�c�N�L�#�~8eq��(��HKXM���9l� �!�>���A���@W��pګA�x� ����j(���F�?��V)uj�1��x��l�:g<._#��d2�-�b�T3>�з�B+�l"����p7���N�oKi�;�K�k%�m��&OK�]�r�)���8�{�3�����*�)Ք�cd'mG��`T��2��n� ;+[���,8S6�3�&�=�?��<4]uܺ�ٝ �S������=֛��D��W�W��L7�P�c퀡�l���w��d{���*�*AQ��O��g05�1~�xn� g!�U�����-YNS:���X�ւ[����;1�S]Mc��������Y)�x����#�[�����U�	_7L���V�r����ES,�I���
��s|��m��Y)�Yt�H-zCZ4��>�B�4ђp9�`�{����ˑ���� :T�+��ӸΖ	���C���6�n��z_�j���?1�b�HÔ�[l�����|�U1#��b^�Mx�"A��[���U��������L6,Q���L]d�������<-ឨvpB�� �0G�L
�*��b�l�_c6RW�FU\�xxu@�`��W2̃�0(}>5Q)?f�� �Pf�8�Ts���a��\_iD���[2��y�q[�1�g�8eጟ��C�ba�ˠǼ#�9�g�$�w�
��g��!�ҥ}o��!��O騛��;#W�G�XŽ�E�4�t��1P��]����k͔㗬�G"^\o6<|�J��&�;C���E���p��8�$�8VǏБ�u�p%�vL����B��\�+��-�yeV=g���B#!�I�+�QY�,D;n5>hۙݝ��F��P�128*�ܦ�Eژ�����%�k}!f%*6�� j0�g�n�������O�&�0�!��X^�c�U�3~��2`�nv�i�^��`U�LzzmEJZ2L��3Wrs��,���=��G�"%�$�*͘R]�x+���7��� $a��1t�%ac+B��r[���n3ٻ0�м����6o�RKu�뢂� �M����JI� 3)g�}���sE|9lȀ	�tj��:��`{Q�2`�verride void Write(byte[] buf, int off, int len)
		{
			if (outputStream == null)
			{
				throw new TTransportException(TTransportException.ExceptionType.NotOpen, "Cannot write to null outputstream");
			}

			outputStream.Write(buf, off, len);
		}

		public override void Flush()
		{
			if (outputStream == null)
			{
				throw new TTransportException(TTransportException.ExceptionType.NotOpen, "Cannot flush null outputstream");
			}

			outputStream.Flush();
		}
	}
}
